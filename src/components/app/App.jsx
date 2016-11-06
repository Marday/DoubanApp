import React from 'react'
import fetchJsonp from 'fetch-jsonp'
import { render } from 'react-dom'
import {Link} from 'react-router'
import HeaderBar from '../HeaderBar/HeaderBar.jsx'
import Loading from '../Loading/Loading.jsx'
import './app.scss'

class App extends React.Component {
	constructor (){
		super()
		this.state={
			data: [],
			loading: true,
			showMenu: "none"
		}
	}
	render () {
		if(this.state.loading){
			return <Loading />
		}else{
			var data = this.state.data
			var menuShow = this.state.showMenu==="none"? " ":"show"
			var repoList = data.map(function (repos,index){
				var itemBox = repos.subjects.map(function (item, index){
					return (
						<li className="movie-box-item" key={ item.id }>
							<div className="movie-box-head">
							<Link to={ "/show/"+item.id }>
								<img src={ item.images.large } alt={ item.title }/>
								<p>{ item.title }</p>
							</Link>
							</div>
						</li>
					)
				}
				)
				return (
					<div className="section" key={ index }>
						<div className="movie-box-sort">
							<h3>{repos.title}</h3>
							<Link to={`/list/${ repos.name }`}>
								<span>{ repos.total + "个"}</span>
							</Link>
						</div>
						<ul className="movie-box-wrap">
							{ itemBox }
						</ul>
					</div>
				)
			})
			return (
				<div>
					<div className={`homePage ${menuShow}`}>
						<div className = "movie-wrapper">
							<HeaderBar type="app" showMenu={this.showMenu.bind(this)} show={this.state.showMenu}/>
							{ repoList }
						</div>
					</div>
					<div className="side-bar">
						<div className="side-bar-site">
							<h2>豆瓣</h2>
							<div className='iconfont-account'></div>
							<div className='iconfont-add'></div>
							<div className='iconfont-comment'></div>
						</div>
						<Link to="/search">
							<div className="ipt">
								<span className="iconfont-search"></span>
								<input placeholder="请输入关键字"/>
							</div>
						</Link>
						<i></i>
						<ul>
							<li>电影首页</li>
							<Link to="/list/in_theaters"><li>正在上映</li></Link>
							<Link to="/list/coming_soon"><li>即将上映</li></Link>
							<Link to = "/list/top250"><li>Top250</li></Link>
							<li>使用反馈</li>
							<li>退出登录</li>
						</ul>
					</div>
				</div>
			)
		}
	}
	componentDidMount (){
		this.getData()
	}
	showMenu (show){
		this.setState({showMenu:show})
	}
	getData (){
		let category = ['in_theaters','coming_soon','top250'];
		var resData = []
		category.forEach(
			(name, index)=>fetchJsonp(`https://api.douban.com/v2/movie/${ name }?count=6`)
			  .then(response => response.json())
			  .then(value => {
			  	value.name=name
			  	resData[index]=value  //因为三个异步请求不清楚谁先返回，所以一对一加入value
			  	if(resData.length==category.length){this.setState({loading:false})}
			  	this.setState({data:resData})	
			  })
			  .catch(e=>console.log(e))
		)
	}
}

module.exports = App
