import React from 'react'
import './star.scss'

class Star extends React.Component {
	render(){
		var starCount = []
		for (let i = 0; i < 5; i++) {
			starCount.push(<span className="iconfont-star" key={i}></span>)
		}
		return(
			<div className={this.props.size?"star big":"star"}>
				<div className="star-total star-pos">
					{ starCount }
				</div>
				<div className="light-star star-pos" style={{width:this.props.per*10 + "%"}}>
					{ starCount }
				</div>
				<div className="score">{this.props.per}</div>
			</div>
		)
	}
}

module.exports = Star