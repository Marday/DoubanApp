import React from 'react'
import fetchJsonp from 'fetch-jsonp'
import {Link} from 'react-router'
import HeaderBar from '../HeaderBar/HeaderBar.jsx'
import Loading from '../Loading/Loading.jsx'
import './list.scss'
import MovieDes from '../MovieDes/MovieDes.jsx'

class List extends React.Component {
	constructor () {
		super()
		this.state={
			data:[],
			page:1,
			more:'加载中',
			loading:true,
			toTop:false
		}
		this.scroll=this.scroll.bind(this)
	}
	render () {
		if(this.state.loading){
			return <Loading/>
		}else{
			var data = this.state.data
			var repoList = data.map(function (repos,index){
				return <MovieDes data={repos} key={index} type='list'/>
			})
			return  (
				<div className="movie-wrapper" onWheel = {this.wheel.bind(this)}>
					<HeaderBar type="list" toTop={this.state.toTop}/>
					<ul className="movie-list-wrap">
						{ repoList }
					</ul>
					<div className="list-more">
						<p>{this.state.more}</p>
						<span className="movie-loading" style={{display:this.state.more==='加载中'?'inline-block':'none'}}></span>
					</div>
				</div>
			)
		}
	}
	//把componentDidMount改为componentWillMount可以加快渲染
	componentWillMount (){
		this.getData()
		window.addEventListener('scroll',this.scroll,false)
		//针对在list页面下拉请求更多数据时，有可能用户会在数据回来前点击到下一个页面，
		//造成Warning: setState(...): Can only update a mounted or mounting component
		//在此处做一个判断，如果用户没切到下一个页面，就不调用setState（）
		this.isUnmounted = false
		//在scroll到最下面的时候会触发getData（），如果不限制请求次数有可能会发送2次或更多次的数据请求，因为下拉会
		//触发多次事件。因此加一个upData来防止多次调用getData（）
		this.upData = false
	}
	componentWillUnmount () {
		window.removeEventListener('scroll', this.scroll, false)
		this.isUnmounted=true
	}
	getData (){
		fetchJsonp(`https://api.douban.com/v2/movie/${this.props.params.type}?count=10&start=${(this.state.page - 1) * 10}`)
		  .then(response => {if(!this.isUnmounted){return response.json()}})
		  .then(value => {

				if (value.subjects &&value.subjects.length==0) {
					this.setState({more:"没有更多"})
				}
				if(this.state.page==1){
					this.setState({loading:false})
				}
				this.setState({
					data:this.state.data.concat(value.subjects),
					page:++this.state.page
				})    
				this.upData = false
			})
			.catch(e=>this.upData = false)
	}
	scroll (){
		if(this.state.loading==false){
			if (document.body.scrollHeight-document.body.scrollTop-window.screen.height<=5 && this.state.more==='加载中' && !this.upData) {
				this.upData=true
				this.getData()
			}
		}
	}
	//增加一个回顶部并且在HeaderBar上可以显示返回顶部提示
	wheel(event){
		//如果存在向上滚动的操作且页面不处于页面顶部，则在顶部栏提示可以双击会顶部
		if(event.deltaY < 0 && !document.body.scrollTop == 0){
			this.setState({toTop:true})
			setTimeout(function(){this.setState({toTop: false})}.bind(this),500)
		}
	}
}

module.exports = List