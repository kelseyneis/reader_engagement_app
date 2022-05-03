// Importing modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paragraph from "../Paragraph";

class Instructions extends Component {
    //todo: figure out how to pass story name to Reader
    render() {
        return (
            <div className="instructions">
                <h1>Reader engagement survey</h1>
                <p>
                    In this study, we are trying to endow machines with an understanding
                    of what makes a story good, because nobody likes a future where AI
                    has bad taste :). So, as you're reading, if you enjoy the story, please
                    keep in the back of your mind the question, "what do I like about it and
                    why do I want to read more?" In the short term, this feedback will help
                    train a system to identify engaging stories and what makes
                    them engaging. If you don't like the story, that's ok. Feel free to skim it
                    and give feedback about what you didn't like.
                </p>
                <h2>Instructions</h2>
                <p>
                    <ol>
                        <li>
                            Login here by entering your name:
                            <b><Link className="nav-link" to="/login">Login</Link></b>
                        </li>
                        <li>
                            Choose a story below to read. Please read the first page, then answer the questions
                            on the next page. After that, read the rest of the story and answer the questions
                            at the end.
                        </li>

                        <li>
                            Then you'll go back and read the story again. This time, highlight areas that made you:
                            <ol>
                                <li>Confused</li>
                                <li>Connected to or empathetic with a character</li>
                                <li>Transported to the scene of the story</li>
                                <li>Curious about the writer's intentions or about what will happen next</li>
                                <li>Other. You enjoyed it but don't know why</li>
                            </ol>
                        </li>
                    </ol>
                </p>
                <hr />
                <h2>Highlighting Practice</h2>
                <p>To highlight a passage, first select the category you want to label it using the dropdown
                    below. Then, drag your mouse over the text to highlight it. You can highlight multiple
                    categories in one paragraph by repeating those steps. If you make a mistake, just click
                    on the highlighted area, and it will remove the highlight. Give it a try!</p>
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

export default Instructions;