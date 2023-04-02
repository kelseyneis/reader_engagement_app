import React, { Component } from "react";
import { TextAnnotator } from 'react-text-annotate'
import { ReactDOM } from "react";

const log = require('console-log-level')({
   prefix: function (level) {
      return new Date().toISOString()
   },
   level: 'info'
})

class Paragraph extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.tag,
         tag: 'Confused',
         content: props.value
      };
      this.highlight = this.highlight.bind(this)
   }
   COLORS = {
      Confused: "#CC79A7", Connected: "#D55E00",
      Present: "#0072B2", Curious: "#F0E442", Other: "#009E73"
   }


   getAnnotate() {
      return (this.props.annotate ? "" : "none");
   }

   async highlight(value) {
      const highlight = value.concat({ paragraph: this.props.index });
      log.info(JSON.stringify(highlight));
      await fetch('/backend/log_highlights', {
         method: 'POST', body: JSON.stringify(highlight),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   render() {
      return (
         <div className="paragraph visible"
            page={this.props.page}
            style={this.props.style} index={this.props.index}
            >
            {/* <select className="form-select form-select-sm"
               style={{ display: this.getAnnotate(), width: '15%' }}
               onChange={e => this.setState({ tag: e.target.value })}
               value={this.state.tag}
            >
               <option value="Confused">Confused, don't understand</option>
               <option value="Connected">Connected to the character</option>
               <option value="Present">Vividly picture the scene</option>
               <option value="Curious">Curious about what will happen</option>
               <option value="Other">Liked (other)</option>
            </select> */}
            {/* dangerouslySetInnerHTML={{ __html: this.props.value }} */}
            <p>
               <TextAnnotator
                  content={this.props.value}
                  value={this.state.value}
                  onChange={value => {
                     this.setState({ value });
                     this.highlight(value)
                  }}
                  getSpan={span => ({
                     ...span,
                     tag: this.state.tag,
                     color: this.COLORS[this.state.tag],
                  })}
                  renderMark={props => (
                     <mark
                        key={props.key}
                        onClick={() => props.onClick({ start: props.start, end: props.end })}
                     >
                        {props.content} [{props.tag}]
                     </mark>
                  )}
               >
               </TextAnnotator>
            </p>
         </div>
      )
   }
}

export default Paragraph;