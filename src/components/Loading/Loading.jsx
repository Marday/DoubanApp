import React from 'react'
import './loading.scss'

class Loading extends React.Component{
	render(){
		return(
		<div className="movie-wrap-loading">
			<div className="loading-wrap">
				<div className="loading" style={{background:"url(./src/components/img/loading_white.png)"+";background-size: auto 37px"}}>
				</div>
			</div>
		</div>
		)
	}
}

module.exports = Loading
