import React from 'react'
import { Link } from 'react-router'
import "./headerBar.scss"

class HeaderBar extends React.Component {

	render(){
		return (
			<div className="ui-component-header"  onDoubleClick={this.dblclick.bind(this)} >
				<div className="header-menu-left" style={{display:this.props.type=='app'?'block':'none'}} onClick={this.handleClick.bind(this)}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="header-menu-left" style={{display:this.props.type=='app'?'none':'block'}} onClick={this.back.bind(this)}>
					<span className="iconfont-back"></span>
				</div>
				<p>{this.props.toTop ? "双击返回顶部" : "电影"}</p>
				<Link to = "/search">
					<button className="iconfont-search header-menu-right">
					</button>
				</Link>
			</div>
		)
	}
	handleClick (){
		if(this.props.show==="none"){
			this.props.showMenu("show")
		}else{
		  this.props.showMenu("none")
		}	
	}
	dblclick(){
		window.scrollTo(0,0)
	}
  back (){
  	history.back()
  }
}
module.exports = HeaderBar