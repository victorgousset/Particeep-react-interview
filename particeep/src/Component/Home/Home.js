import React, {Component} from "react";

import './Home.css';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            category: [],
            filter: [],
            DefaultLike: false,
            LikeDislike: []
        }

    }

    componentDidMount() {
        import('./movies').then((movies$) => {
            Promise.resolve(movies$).then((value) => {
                Promise.resolve(value.movies$).then((response) => {
                    this.setState({movies: response})
                    for (let i = 0; i < this.state.movies.length; i++)
                    {
                        if (!this.state.category.find(element => element === this.state.movies[i].category)) {
                            this.setState({category: [...this.state.category, this.state.movies[i].category]})
                        }

                        this.setState({LikeDislike: [...this.state.LikeDislike, false]})
                        console.log(this.state.LikeDislike)
                    }
                })
            })
        }).catch(error => console.log(error))
    }

    DeleteCard = (id) => {
        let id_supp = id - 1;
        delete this.state.movies[id_supp]

        let new_tab = this.state.movies
        this.setState({movies: {}})
        this.setState({movies: new_tab})
    }

    FilterChange = (name) => {
        if (!this.state.category.find(element => element === name)) {
            this.state.filter.push(name)
            let id_supp = this.state.filter.indexOf(name)
            delete this.state.filter[id_supp]
        } else {
            this.state.filter.push(name)
        }

        console.log(this.state.filter)
    }

    HandleChangeLikeDislike = (id) => {
        let id_like = parseInt(id) - 1;
        console.log(id_like)
        if(this.state.LikeDislike[id_like] === false) {
            this.state.LikeDislike[id_like] = true; //like
            let last_number_like = parseInt(this.state.movies[id_like].likes)
            let last_array = this.state.movies;
            this.setState({movies: {}})
            this.setState({movies: last_array})
            this.state.movies[id_like].likes = last_number_like + 1;
        } else {
            this.state.LikeDislike[id_like] = false; //dislike
            let last_number_like = parseInt(this.state.movies[id_like].likes)
            let last_array = this.state.movies;
            this.setState({movies: {}})
            this.setState({movies: last_array})
            this.state.movies[id_like].likes = last_number_like - 1;
        }

    }

    render() {
        return (
            <div className="Home">
                {
                    this.state.category.map((name) => {
                        return ( <label><input type="checkbox" onChange={() => { this.FilterChange({name})}} name={name}></input>{name}</label> );
                    })
                }
                <div className="row">
                {
                    this.state.movies.map(function(i) {

                        return ( <div className="column">
                                <div key={i} className="Home_card">
                                    <h3 className="Home_card_title">{i.title}</h3>
                                    <div className="Home_card_title_bar" id={'test'}>
                                        <div className="Home_card_title_bar_like"
                                             style={{height: 25, width: (i.likes / (i.likes + i.dislikes) * 100 + '%')}}>
                                        </div>
                                        <div className="Home_card_title_bar_dislike"
                                             style={{height: 25, width: (i.dislikes / (i.dislikes + i.likes) * 100 + '%')}}>
                                        </div>
                                    </div>
                                    <Toggle
                                        id='cheese-status'
                                        defaultChecked={this.state.DefaultLike}
                                        onChange={() => {this.HandleChangeLikeDislike(i.id)}} />

                                    <div><button onClick={() => { this.DeleteCard(i.id) }} >X</button></div>
                                </div>
                                </div> );
                    }, this)
                }
                </div>
            </div>
        );
    }


}

export default Home;