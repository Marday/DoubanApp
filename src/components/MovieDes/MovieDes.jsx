import React from 'react'
import Star from '../Star/Star.jsx'
import './movieDes.scss'
import { Link } from 'react-router'

class MovieDes extends React.Component {
	render(){
		var repos = this.props.data
		var getStar = repos.rating.average
		var directors=repos.directors.map(function (item,index){
			return (item.name+' ')
		})
		var casts = repos.casts.map(function (item,index){
			return  (item.name)
		})
		if (this.props.type==="list") {
			return (
				<Link to={`/show/${ repos.id }`}>
					<li className="movie-list-item">
						<div className="movie-list-img">
							<img alt={ repos.title } src={ repos.images.small }/>
						</div>
						<div className="movie-list-des">
							<h3>{ repos.title }</h3>
							<Star per={getStar}/>	
							<p>{ '类型:'+repos.genres.join(' ') }</p>
							<p>{`导演:${ directors.join('/') }`}</p>
							<p>{`主演:${ casts.join('/') }`}</p>
						</div>
					</li>
				</Link>
			)
		}else{
			return (
				<div className="movie-show-item">
					<div className="movie-show-bg" style={{backgroundImage: `url(${repos.images.large})`}}>
					</div>
					<div className="movie-show-img">
						<img alt={ repos.title } src={ repos.images.medium }/>
					</div>
					<div className="movie-show-des">
						<h3>{ `${repos.title} (${repos.countries})` }</h3>
						<Star per={getStar} size="big"/>	
						<p>{ `类型:${repos.genres.join(' ')}` }</p>
						<p>{`导演:${ directors.join('/') }`}</p>
						<p>{`主演:${ casts.join('/') }`}</p>
					</div>
				</div>
			)
		}
		
	}
}
module.exports = MovieDes