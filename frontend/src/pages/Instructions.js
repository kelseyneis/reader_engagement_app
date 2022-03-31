// Importing modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Instructions extends Component {
 //todo: figure out how to pass story name to Reader
 render() {
    return(
    <div className="instructions">
       <h1>Reader engagement survey</h1>
        <p>
            In this study, we are trying to endow machines with an understanding
            of what makes a story good, because nobody likes a future where AI
            has bad taste :). So, as you're reading, if you enjoy the story, please
            keep in the back of your mind the question, "what do I like about it and
            why do I want to read more?" In the short term, this feedback will help
            train a system to identify engaging stories and aspirationally, what makes
            them engaging. If you don't like the story, that's ok. Feel free to skim it
            and give feedback about what you didn't like.
        </p>
        <p>
            Choose a story below to read. Please read the first page, then answer the questions
            on the next page. After that, read the rest of the story and answer the questions
            at the end.
        </p>
        <p>
            Then you'll go back and read the story again. This time, highlight areas that made you:
        </p>
        <ol>
            <li>Confused (Red)</li>
            <li>Connected to or empathetic with a character (Green)</li>
            <li>Transported to the scene of the story (Blue)</li>
            <li>Curious about the writer's intentions or about what will happen next. (Yellow)</li>
            <li>Other. You enjoyed it but don't know why (Orange)</li>
        </ol>
        <ul>
            <li>
               <Link to="/schoolmistress">The Schoolmistress</Link>
            </li>
            <li>
               <Link to="/chemistswife">The Chemist's Wife</Link>
            </li>
            <li>
               <Link to="expensivelessons">Expensive Lessons</Link>
            </li>
        </ul>
    </div>
    )
 }
}

export default Instructions;