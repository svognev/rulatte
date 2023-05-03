import React from "react";

import { transleteToLat, transleteToRu } from "./utils/translaror";

import "./App.scss";

class App extends React.PureComponent {
    state = {
        isToLat: true,
        text: "",
        translatedText: "",
        loading: false,
    };

    changeTranslateDirection = () => {
      this.setState(prevState =>({ 
        isToLat: !prevState.isToLat,
        text: prevState.translatedText,
      }), () => this.updateTextFields(null));
    };

    updateTextFields = value => {
      const text = value !== null ? value : this.state.text;
      const translate = this.state.isToLat ? transleteToLat : transleteToRu;
      const translatedText = translate(text);
      this.setState({ text, translatedText });
    };

    onTextChange = e => {
      const newValue = e?.target?.value || "";
      console.warn(newValue);
      this.updateTextFields(newValue);
    };

    copyTranslatedToClipboard = async () => {
      this.setState({ loading: true });
      await navigator.clipboard.writeText(this.state.translatedText);
      this.setState({ loading: false });
    };

    render() {
      const { isToLat, text, translatedText, loading } = this.state;
      const headerText = isToLat ? "translate from cyrillic russian to rulatte" : "translate from rulatte to cyrillic russian";

        return (
            <div className="app-container">
              <div className={`app${loading ? " app_loading" : ""}`}>
                <h1 className="header">{headerText}</h1>
                <div className="translator">
                  <div className="translator-textField">
                    <textarea 
                      value={text}
                      onChange={this.onTextChange}
                      autoFocus
                    />
                  </div>
                  <div className="translator-directionButton">
                    <button 
                      onClick={this.changeTranslateDirection}
                    >
                      <svg width="21px" height="21px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)"><path d="m4.5 8.5-4 4 4 4"/><path d="m12.5 12.5h-12"/><path d="m8.5.5 4 4-4 4"/><path d="m12.5 4.5h-12"/></g></svg>
                    </button>
                  </div>
                  <div className="translator-translatedField">
                    <p>{translatedText}</p>
                  </div>
                  <div className="translator-copyButton">
                    <button 
                      onClick={this.copyTranslatedToClipboard}
                    >
                      copy text to clipboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default App;
