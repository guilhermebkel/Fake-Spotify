import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Icon } from 'antd'
import Fade from 'react-reveal/Fade';

import Sidebar from '../../components/Desktop/Sidebar'
import Dashboard from '../../components/Desktop/Dashboard'
import Player from '../../components/Desktop/Player'

import { getUserData, getUserPlaylists, getUserTracks } from '../../services/spotify'

import './style.css'

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />

class Desktop extends Component{
    constructor(props){
        super(props)
        this.state = {
            token: this.props.state.token,
            modalDisplay: {display: "flex"},
            desktopDisplay: {display: "none"}
        }
    }
    
    async componentDidMount(){
        
        if(!this.state.token){
            return this.props.history.push('/', this.props.state.device);
        }

        const userData = await getUserData(this.state.token)
        const userPlaylists = await getUserPlaylists(this.state.token)
        const userTracks = await getUserTracks(this.state.token)
        const data = {
            followers: userData.followers.total,
            name: userData.display_name,
            avatar_url: userData.images[0].url,
            playlists: userPlaylists.items,
            tracks: userTracks.items,
            song: userTracks.items[0],
            playlist: userPlaylists.items[0]
        }

        const changeState = (data) => ({ type: 'GET_INITIAL_DATA', data })
        this.props.dispatch(changeState(data))
        this.setState({
            desktopDisplay: {display: "block"},
            modalDisplay: {display: "none"}
        })
    }

    render(){
        return (
            <>
                <div className="loading-modal" style={this.state.modalDisplay}>
                    <Spin style={{color: "#1ED761", margin: "auto"}} indicator={antIcon} />
                </div>
                <Fade ssrFadeout>
                    <div className="desktop" style={this.state.desktopDisplay}>
                        <div style={{display: "grid", gridTemplateColumns: "15vw 85vw", height: "87vh"}}>
                            <Sidebar />
                            <Dashboard />
                        </div>
                        <div style={{height: "13vh"}}>
                            <Player />
                        </div>
                    </div>
                </Fade>
            </>
        )
    }
}

export default connect(state => ({ state }))(Desktop)