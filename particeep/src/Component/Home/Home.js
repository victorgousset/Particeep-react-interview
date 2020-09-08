import React, {Component} from "react";

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
                console.log(typeof value.movies$)
                console.log(value.movies$)
                Promise.resolve(value.movies$).then((response) => {
                    console.log(typeof response)
                    this.setState({movies: response})
                })
            })

        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="Home">
                <div className="row">
                {
                    this.state.movies.map(function (i) {

                        return <div className="column">
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
                                </div>
                                </div>
                    })
                }
                </div>
            </div>
        );
    }


}

export default Home;