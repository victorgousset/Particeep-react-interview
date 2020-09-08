import React, {Component, useState} from "react";

import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }


    componentDidMount() {
        import('./movies').then((movies$) => {
            Promise.resolve(movies$).then((value) => {
                Promise.resolve(value.movies$).then((response) => {
                    this.setState({movies: response})
                })
            })

        }).catch(error => console.log(error))
    }

    test = (id) => {
        let id_supp = id - 1;
        delete this.state.movies[id_supp]
        
        let new_tab = this.state.movies
        this.setState({movies: {}})
        this.setState({movies: new_tab})
    }

    render() {
        return (
            <div className="Home">
                <div className="row">
                {
                    this.state.movies.map(function (i) {

                        return ( <div className="column">
                                <div key={i} className="Home_card">
                                    <h3 className="Home_card_title">{i.title}</h3>
                                    <div className="Home_card_title_bar">
                                        <div className="Home_card_title_bar_like"
                                             style={{height: 25, width: (i.likes / (i.likes + i.dislikes) * 100 + '%')}}>
                                        </div>
                                        <div className="Home_card_title_bar_dislike"
                                             style={{height: 25, width: (i.dislikes / (i.dislikes + i.likes) * 100 + '%')}}>
                                        </div>
                                    </div>
                                    <div><button onClick={() => { this.test(i.id) }} >X</button></div>
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