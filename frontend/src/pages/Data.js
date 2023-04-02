import React, { Component } from 'react';
import DisplayHighlights from '../DisplayHighlights';

class Data extends Component {
   constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
         story: this.props.story,
			participant: this.props.participant,
         key: this.props.key
		};

		// Bind stateful functions
		this.selectParticipant = this.selectParticipant.bind(this);
   }

   selectParticipant(event) {
		this._isMounted = true;
		this.setState({
			participant: event.target.value,
         key: event.target.value
		})
	}

   render() {
      return (
         <div className="data">
            <label htmlFor="participant">Choose a participant:</label>

            <select name="participant" id="participant" defaultValue="2" onChange={this.selectParticipant}>
               <option value="2">id2</option>
               <option value="3">id3</option>
               <option value="5">id5</option>
               <option value="7">id7</option>
               <option value="8">id8</option>
               <option value="10">id10</option>
               <option value="11">id11</option>
               <option value="12">id12</option>
               <option value="13">id13</option>
               <option value="14">id14</option>
               <option value="15">id15</option>
               <option value="17">id17</option>
               <option value="18">id18</option>
               <option value="19">id19</option>
               <option value="20">id20</option>
               <option value="21">id21</option>
               <option value="22">id22</option>
               <option value="23">id23</option>
               <option value="24">id24</option>
               <option value="25">id25</option>
               <option value="27">id27</option>
               <option value="28">id28</option>
               <option value="30">id30</option>
            </select>
            <DisplayHighlights story={this.state.story} participant={this.state.participant} key={this.state.key}/>
         </div>
      );
   }
}

export default Data;