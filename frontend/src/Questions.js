import React, { useState } from "react";

const log = require('console-log-level')({
   prefix: function (level) {
      return new Date().toISOString()
   },
   level: 'info'
})

export const FirstQuestions = props => {
   const [inputs, setInputs] = useState({});
   const [submitted, setSubmitted] = useState("")

   const questions = ['What did you like about the beginning of the story?',
      'What do you want to know? Think of some questions you\'d like the story to answer.',
      'What did you not like about it?']

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }))
   }

   const handleSubmit = async ev => {
      ev.preventDefault();
      log.info(inputs)
      setInputs(inputs)
      setSubmitted(true);
      await fetch('./log_questions', {
         method: 'POST', body: JSON.stringify(inputs),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   return (
      <div className="paragraph visible"
         id="firstQuestions"
         index={props.index}
         page={props.page}
         style={props.style}>
         <form className="mb-3" onSubmit={handleSubmit}>
            {questions.map((value, index) => {
               return (
                  <div className="firstPageQuestions" key={index}>
                     <label className="form-label">{value}</label>
                     <textarea className="form-control" rows="4" cols="50"
                        id={`firstPageQuestions${index}`}
                        type="text"
                        name={`firstPageQuestions${index}`}
                        value={inputs[`firstPageQuestions${index}`] || ""}
                        onChange={handleChange}></textarea>
                  </div>
               )
            })}
            < button className="btn btn-primary btn-sm" type="submit" > Submit</button>
         </form>
         {submitted ? <p style={{ color: "green" }}>Submitted successfully!</p> : ""}
      </div >
   )
}

const RadioQuestion = props => {
   return (
      <div className="radio" onChange={props.onChange}>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}1`} value="option1" />
            <label className="form-check-label" htmlFor={`${props.name}1`}>1</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}2`} value="option2" />
            <label className="form-check-label" htmlFor={`${props.name}2`}>2</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}3`} value="option3" />
            <label className="form-check-label" htmlFor={`${props.name}3`}>3</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}4`} value="option4" />
            <label className="form-check-label" htmlFor={`${props.name}4`}>4</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}5`} value="option5" />
            <label className="form-check-label" htmlFor={`${props.name}5`}>5</label>
         </div>
      </div>
   )
}

export const LastQuestions = props => {
   const [inputs, setInputs] = useState({});
   const [submitted, setSubmitted] = useState("");
   const radioQuestions = ['I was curious about what would happen next.',
      'The story affected me emotionally.',
      'While reading my body was in the room, but my mind was inside the world created by the story.',
      'At times while reading, I wanted to know what the writer\'s intentions were.',
      'My understanding of the characters is unclear.',
      'While reading, when a main character succeeded, I felt happy, and when they suffered in some way, I felt sad.',
      'I had a hard time keeping my mind on the story.',
      'The characters were alive in my imagination.',
      'I found my mind wandering while reading the story.',
      'I could vividly imagine the scenes in the story.',
      'At points, I had a hard time making sense of what was going on in the story.'];

   const freeQuestions = ['What did you think of the story overall? Feel free to share any thoughts and impressions you have.',
      'Did the survey setup get in the way of enjoying the story?',
      'Any additional feedback or suggestions?'];

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
   }

   const handleSubmit = async ev => {
      ev.preventDefault();
      log.info(inputs);
      setInputs(inputs);
      setSubmitted(true);
      await fetch('./log_questions', {
         method: 'POST', body: JSON.stringify(inputs),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   return (
      <div className="paragraph hidden"
         id="lastQuestions"
         index={props.index}
         page={props.page}
         style={props.style}>
         <form className="mb-3" onSubmit={handleSubmit}>
            {radioQuestions.map((value, index) => {
               return (
                  <div className="radioQuestion" key={`1-${index}`}>{value}
                     <RadioQuestion index={index}
                        value={inputs[`inlineRadioOptions${index}`]}
                        name={`inlineRadioOptions${index}`}
                        onChange={handleChange} />
                  </div>
               )
            })}
            <br /><hr />
            {freeQuestions.map((value, index) => {
               return (
                  <div className="freeformQuestion" key={`2-${index}`}>
                     <label className="form-label">{value}</label>
                     <textarea className="form-control" rows="4" cols="50"
                        id={`lastpagefreeform${index}`}
                        type="text"
                        name={`lastpagefreeform${index}`}
                        value={inputs[`lastpagefreeform${index}`] || ""}
                        onChange={handleChange}></textarea>
                  </div>
               )
            })}
            <button className="btn btn-primary btn-sm" type="submit">Submit</button>
         </form>
         {submitted ? <p style={{ color: "green" }}>Submitted successfully!</p> : ""}
      </div>
   )
}