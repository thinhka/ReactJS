"use strict";

var CasioApp = React.createClass({
    displayName: "CasioApp",
    getInitialState: function getInitialState() {
        return { isAnswer: false, text: 0 };
    },
    onChange: function onChange(e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {

    },
    _number: function _number(num) {
        var lastnumber = this.state.text.toString().substring(this.state.text.toString().length - 1, this.state.text.toString().length);
        if (!(lastnumber == '.' && num == '.')) {
            var newText = ((this.state.text === 0 && num != '.') || this.state.isAnswer) ? (num == '00' ? 0 : num) : '' + this.state.text + num;
            this.setState({ isAnswer: false, text: newText });
        }
    },
    _clear: function _clear() {
        this.setState({ isAnswer: false, text: 0 });
    },
    _contentClear: function _contentClear() {
        var lessOne = this.state.text.toString().trim().substring(0, this.state.text.toString().trim().length - 1).trim();
        this.setState({ isAnswer: false, text: lessOne === '' ? 0 : lessOne });
    },
    _eq: function _eq(type) {
        var equation = this.state.text.toString().substring(this.state.text.toString().length - 2, this.state.text.toString().length - 1);
        if (equation != '+' && equation != '-' && equation != '*' && equation != '/')
            this.setState({ isAnswer: false, text: this.state.text + " " + type + " " });
    },
    _equate: function _equate() {
        var equation = this.state.text.toString().substring(this.state.text.toString().length - 2, this.state.text.toString().length - 1);
        if (equation != '+' && equation != '-' && equation != '*' && equation != '/')
            this.setState({ isAnswer: true, text: eval(this.state.text) });
    },
    _percent: function _percent(){
        this.setState({ isAnswer: false, text: this.state.text / 100 });
    },
    render: function render() {
        return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement("input", { className: "input-group-field", disabled: true, type: "text", onChange: this.onChange.bind(this), value: this.state.text }),
                React.createElement(
                  "div",
                  { className: "input-group-button" },
                  React.createElement(button, { text: "1", clickHandler: this._number }),
                  React.createElement(button, { text: "2", clickHandler: this._number }),
                  React.createElement(button, { text: "3", clickHandler: this._number }),
                  React.createElement(button, { text: "+", clickHandler: this._eq }),
                  React.createElement(button, { text: "4", clickHandler: this._number }),
                  React.createElement(button, { text: "5", clickHandler: this._number }),
                  React.createElement(button, { text: "6", clickHandler: this._number }),
                  React.createElement(button, { text: "-", clickHandler: this._eq }),
                  React.createElement(button, { text: "7", clickHandler: this._number }),
                  React.createElement(button, { text: "8", clickHandler: this._number }),
                  React.createElement(button, { text: "9", clickHandler: this._number }),
                  React.createElement(button, { text: "*", clickHandler: this._eq }),
                  React.createElement(button, { text: "00", clickHandler: this._number }),
                  React.createElement(button, { text: "0", clickHandler: this._number }),
                  React.createElement(button, { text: "%", clickHandler: this._percent }),
                  React.createElement(button, { text: "/", clickHandler: this._eq }),
                  React.createElement(button, { text: "C", clickHandler: this._clear }),
                  React.createElement(button, { text: "CE", clickHandler: this._contentClear }),
                  React.createElement(button, { text: ".", clickHandler: this._number }),
                  React.createElement(button, { text: "=", clickHandler: this._equate })

          )
        );
    }
});

var button = React.createClass({
    displayName: "button",
    _handleClick: function _handleClick() {
        var text = this.props.text,
            cb = this.props.clickHandler;
        if (cb) {
            cb.call(null, text);
        }
    },
    render: function render() {
        return React.createElement(
          "button",
          { className: this.props.klass, onClick: this._handleClick },
          React.createElement(
            "span",
            { className: "title" },
            this.props.text
          )
        );
    }
});

ReactDOM.render(React.createElement(CasioApp, null), document.getElementById('app'));