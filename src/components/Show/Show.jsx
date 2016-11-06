import React from 'react'
import {Link} from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import HeaderBar from '../HeaderBar/HeaderBar.jsx'
import MovieDes from '../MovieDes/MovieDes.jsx'
import './show.scss'
import Loading from '../Loading/Loading.jsx'

class Show extends React.Component{
	constructor(){
		super()
		this.state={
			data:[],
			loading:true
		}
	}
	render(){
		if(this.state.loading){
			return <Loading />
		}else{
			var data = this.state.data
			var directors=data[0]?data[0].directors:[]
			var casts=data[0]?data[0].casts:[]
			var movieDes = data.map((repos, index)=>{
				return(<MovieDes data={repos} key="index"/>)
			})
			return (
				<div className="movie-wrapper">
					<HeaderBar/>
					{ movieDes }
					<div className="movie-summary">
						<h2>剧情简介</h2>
						<p>{ data[0]?data[0].summary:"" }</p>
					</div>
					<h3 className="movie-show-divider">导演</h3>
					<div className="movie-team">
						{
							directors.map((item, index)=>{
								return(
									<div className="movie-person" key={index}>
										<img src={item.avatars?item.avatars.small:""}/>
										<h4>{item.name}</h4>
									</div>
								)	
							})
						}
					</div>
					<h3 className="movie-show-divider">演员</h3>
					<div className="movie-team">	
						{
							casts.map((item, index)=>{
								return(
									<div className="movie-person" key={index}>
										<img src={item.avatars?item.avatars.small:"没有图片"}/>
										<h4>{item.name}</h4>
									</div>
								)	
							})
						}
					</div>
				</div>
			)
		}
	}
	componentDidMount (){
		this.getData()
	}
	getData(){
		fetchJsonp(`https://api.douban.com/v2/movie/subject/${this.props.params.id}`)
		.then(response => response.json())
		.then(value => {
			this.setState({
				data:this.state.data.concat(value),
				loading:false
			})
		})
	}
}

module.exports = Show