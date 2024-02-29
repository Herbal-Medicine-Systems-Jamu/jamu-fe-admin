import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Axios from "axios";

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

// class Popup extends React.Component {
//   render() {
//     return (
//       <div className="popup">
//         <FormControl margin="normal" fullWidth>
//           <InputLabel htmlFor="input">Add reference here</InputLabel>
//           <Input
//             value={this.props.input}
//             name="input"
//             onChange={this.props.onChange}
//             type="text"
//           />
//         </FormControl>
//         <Button
//           style={{ marginRight: "10px" }}
//           onClick={this.props.add}
//           variant="contained"
//           color="primary"
//         >
//           Add reference
//         </Button>
//         <Button
//           onClick={this.props.closePopup}
//           variant="contained"
//           color="primary"
//         >
//           Close
//         </Button>
//       </div>
//     );
//   }
// }
class FormTacit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      title: "",
      content: "",
      file: null,
      reference: "",
      input: "",
      mode: "",
      editorState: EditorState.createEmpty()
    };

    this.addreference = this.addreference.bind(this);
    this.onChange = this.onChange.bind(this);

    this.focus = () => this.refs.editor.focus();
    this.onChangeContent = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      try {
        const url = "/jamu/api/tacit/get/" + id;
        const res = await Axios.get(url);
        let data = await res.data.data;
        let content = await JSON.parse(data.content);
        const contentState = await convertFromRaw(content);
        const editorState = await EditorState.createWithContent(contentState);
        // this.afterUpdate(res.data.success, res.data.message);
        this.setState({
          mode: "update",
          id: id,
          editorState: editorState,
          datePublish: data.datePublish,
          reference: data.reference,
          file: data.file,
          title: data.title,
          loading: false
        });
      } catch (err) {
        console.log(err.message);
        // this.afterUpdate(false, err.message);
        this.setState({
          onEror: true,
          loading: false
        });
      }
    } else {
      this.setState({
        mode: "add"
      });
    }
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChangeContent(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChangeContent(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChangeContent(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChangeContent(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(this.state);
  }

  valueChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };
  addreference = () => {
    this.setState({
      reference: [...this.state.reference, this.state.input],
      input: "",
      showPopup: false
    });
  };

  handleSubmit = event => {
    if (this.state.mode === "update") {
      let url = "/jamu/api/tacit/update/" + this.state.id;
      let contentState = this.state.editorState.getCurrentContent();
      contentState = convertToRaw(contentState);
      contentState = JSON.stringify(contentState);
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: user.token
        }
      };

      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("title", this.state.title);
      formData.append("content", contentState);
      formData.append("reference", this.state.reference);
      Axios.patch(url, formData, axiosConfig)
        .then(data => {
          const res = data.data;
          console.log(res);
          window.location.href = "/tacit";
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let url = "/jamu/api/tacit/add";
      let contentState = this.state.editorState.getCurrentContent();
      contentState = convertToRaw(contentState);
      contentState = JSON.stringify(contentState);
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: user.token
        }
      };

      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("title", this.state.title);
      formData.append("content", contentState);
      formData.append("reference", this.state.reference);
      Axios.post(url, formData, axiosConfig)
        .then(data => {
          const res = data.data;
          console.log(res);
          window.location.href = "/tacit";
        })
        .catch(err => {
          console.log(err);
        });
    }

    event.preventDefault();
  };

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <Paper
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "30px",
          padding: "10px"
        }}
        elevation={4}
      >
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            value={this.state.title}
            onChange={this.valueChange}
            name="title"
            id="title"
            type="text"
          />
        </FormControl>
        {/* <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="content">Content</InputLabel>
        <Input name="content" onChange={this.valueChange} id="content" multiline rows={15} />
      </FormControl> */}
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChangeContent}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <FormControl margin="normal" fullWidth>
          <Button>
            <input type="file" name="file" onChange={this.onChange} />
          </Button>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="reference">Reference</InputLabel>
          <Input
            name="reference"
            value={this.state.reference}
            onChange={this.valueChange}
            id="reference"
          />
        </FormControl>
        {/* <label>refrensi :</label>
        <Fab onClick={this.togglePopup} color="primary" aria-label="Add" >
          <AddIcon />
        </Fab>
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            input={this.state.input}
            closePopup={this.togglePopup}
            onChange={this.onChange}
            add={this.addreference}
          />
          : null
        }
        {this.state.reference ? 
          this.state.reference.map(item => {
            return <p>{item}</p>
          })
          : null
        }
        <hr></hr> */}
        <Button
          style={{
            display: "block",
            width: "80%",
            margin: "auto"
          }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Paper>
    );
  }
}

export default FormTacit;
