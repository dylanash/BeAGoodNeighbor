import React from 'react'
import SearchResult from './SearchResult.jsx'
import SavedResults from './SavedResults.jsx'


// these are the search results that will appear below the searchbar
// after a search has been made
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedResults: [],
      isSavedShown: false
    }
  }

  // removes the checked item from the savedResults array if its in there
  handleUncheckedItem(item) {
    // prevState refers to the current state of savedResults
    this.setState((prevState) => {
      // save a copy of the prevState
      var tempArr = prevState.savedResults.slice();
      console.log(tempArr)
      // if the item is in tempArr, splice it out
      if (tempArr.indexOf(item) > -1) {
        tempArr.splice(tempArr.indexOf(item), 1);
        console.log(tempArr);
      }
      return { savedResults: tempArr }
    })
  }

  // if the item is checked, push the item into the savedResults array
  handleCheckedItem(item) {
    this.setState((prevState) => {
      // console.log(prevState)
      var tempArr = prevState.savedResults.slice();
      tempArr.push(item)
      // console.log(tempArr)
      return { savedResults: tempArr }
    })
  }

  handleSave() {
    this.setState({
      isSavedShown: true
    })
  }

  render() {
    return (
      <div className="returned-results">
        <h3> Your Volunteer Opportunities </h3>
          <button onClick={this.handleSave.bind(this)} >
          Save your results
          </button>
          <div>
            <div className="saved-results">
              <div className="saved-label">
              {this.state.isSavedShown === true ?
                <label>
                  Your Saved Results Here!
                  ************************
                </label> : null }
              </div> 
              {(this.state.savedResults.length > 0 && this.state.isSavedShown === true) ?
                this.state.savedResults.map((item, idx) => (
                // item.checked = false
                  <SavedResults item={item}
                                key={idx} 
                  />
                )) : null }
            </div>
          </div>
          <div className="search-results">
            {this.props.results.length > 0 ?
              this.props.results.map((item, idx) => (
                <SearchResult item={item}
                              key={idx} 
                              handleCheckedItem={this.handleCheckedItem.bind(this)}
                              handleUncheckedItem={this.handleUncheckedItem.bind(this)} />
              )) : null }
          </div>
      </div>
    )
  }
}