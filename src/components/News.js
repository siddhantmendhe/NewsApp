import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor(){
        super();

        this.state = {
            articles:[],
            loading: false
        }
    }
   async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505"
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles});
      console.log(parsedData);

       }

    render() {
        return (
          <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row"> 
               { this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.title?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
                })}
                   
                
                </div> 
            </div>
        )
    }
}

export default News
