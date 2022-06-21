// Importing modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Instructions extends Component {
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
                            Login here by entering your first and last name:
                            <b><Link className="nav-link" to="/login">Login</Link></b>
                        </li>
                        <li>
                            Choose a story below, and read it, using the right and left arrow keys to turn the page. There are some questions after the first page and at the end. While you're reading the first time, try to stay relatively still.
                        </li>

                        <li>
                            Then you'll be directed to a highlighting exercise where you'll read the story again. The eye tracking data is not as important on the second read, so feel free to move around more and relax.
                        </li>
                    </ol>
                </p>
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