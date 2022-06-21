// Importing modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paragraph from "../Paragraph";

class Highlight extends Component {
   render() {
      return (
         <div>
            <p>Please select the story you just read below, click the 'Toggle Highlighting' button, and highlight areas that stand out, where you felt:</p>
            <ol>
               <li>Confused</li>
               <li>Connected to the character; able to identify with them or feel their emotions</li>
               <li>Able to vividly picture the scene in the story</li>
               <li>Curious about what will happen next</li>
               <li>Other. You enjoyed it for a different reason</li>
            </ol>
            <h2>Highlighting Practice</h2>
            <p>To highlight a passage, first select the category you want to label it using the dropdown
               below. Then, drag your mouse over the text to highlight it. You can highlight multiple
               categories in one paragraph by repeating those steps. If you make a mistake, just click
               on the highlighted area, and it will remove the highlight. Give it a try!</p>
            <p><em>Note: due to a bug in the app, highlighting over an existing highlight will break the UI. Try not to overlap highlights.</em></p>
            <Paragraph key={10000}
               index={null}
               value='It was the best of times, it was the worst of times, it was the age of wisdom, 
                    it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, 
                    it was the season of Light, it was the season of Darkness, it was the spring of hope, it was 
                    the winter of despair, we had everything before us, we had nothing before us, we were all going 
                    direct to Heaven, we were all going direct the other way—in short, the period was so far like 
                    the present period, that some of its noisiest authorities insisted on its being received, for 
                    good or for evil, in the superlative degree of comparison only.'
               page={null}
               annotate={true}
               tag={[{
                  "start": 572, "end": 616, "text": "in the superlative degree of comparison only",
                  "tag": "Confused", "color": "#CC79A7"
               }, {
                  "start": 290, "end": 343,
                  "text": "we had everything before us, we had nothing before us", "tag": "Connected",
                  "color": "#D55E00"
               }, {
                  "start": 345, "end": 420,
                  "text": "we were all going  direct to Heaven, we were all going direct the other way",
                  "tag": "Curious", "color": "#F0E442"
               }, {
                  "start": 492, "end": 547,
                  "text": "its noisiest authorities insisted on its being received", "tag": "Other", "color": "#009E73"
               }]} />
            <Paragraph key={10001}
               index={null}
               value='There were a king with a large jaw and a queen with a plain face, on the throne of England; there were 
                    a king with a large jaw and a queen with a fair face, on the throne of France. In both countries it was clearer 
                    than crystal to the lords of the State preserves of loaves and fishes, that things in general were settled 
                    for ever.'
               page={null}
               annotate={true}
               tag={[{
                  "start": 0, "end": 90, "text":
                     "There were a king with a large jaw and a queen with a plain face, on the throne of England",
                  "tag": "Present", "color": "#0072B2"
               },
               {
                  "start": 288, "end": 334, "text": "that things in general were settled  for ever.",
                  "tag": "Curious", "color": "#F0E442"
               }]} />
            <hr />
            <h2>Stories</h2>
            <p>
               <ul>
                  <li>
                     <Link to="/read/schoolmistress">The Schoolmistress</Link>
                  </li>
                  <li>
                     <Link to="/read/expensivelessons">Expensive Lessons</Link>
                  </li>
               </ul>
            </p>
         </div>
      )
   }
}

export default Highlight;