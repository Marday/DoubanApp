import React from 'react'
import { Link } from 'react-router'
import "./search.scss"
import fetchJsonp from 'fetch-jsonp'


class Search extends React.Component{
	constructor(){
		super()
		this.state={
			data:[]
		}
	}
	render(){
		let dataList = this.state.data.map((data,index) => {
			let title = data.title
			let starring = data.casts.map((data, index)=>{
				return (`${data.name}|`)
			})
			return (
					<li key = {index}>
						<Link to={`/show/${ data.id }`}>
							<span>{title}</span>
							<span>（主演:{starring}）</span>
						</Link>
					</li>
			)}
		)
		return (
			<div className = "movie-wrapper">
				<div	className = "movie-searchBar">
					<div className = "searchBar-left" onClick={this.back}>
						<span className ="iconfont-back"></span>
					</div>
					<div className = "search-ipt">
						<span className = "iconfont-search" onClick={this.searchImfor.bind(this)}></span>
						<input placeholder="搜索" ref="ipt" onChange={this.handleChange.bind(this)}/>
					</div>
					<span className="cancel" onClick={this.clearVal.bind(this)}>取消</span>
				</div>
				<ul className = "search-list">
					{dataList}
				</ul>
			</div>
		) 
	}
	componentDidMount(){
		this.getData()
	}
	handleChange(event){
		let value=event.target.value
		//使用一次尾调用进行优化
		return this.getData(value)
	}
	getData(reqVal){
		if(reqVal===undefined){return}
		fetchJsonp(`https://api.douban.com/v2/movie/search?q=${reqVal}`)
		.then(response => response.json())
		.then(value => {
			let data=value.subjects
			this.setState({
				data: data
			})
		})
		.catch(e=>console.log(e))
	}
	back(){
		history.back()
	}
	clearVal(){
		this.refs.ipt.value=""
	}
	searchImfor(){
		let value = this.refs.ipt.value
		this.getData(value)
	}
}
module.exports = Search