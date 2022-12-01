import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor(){
        super();

        this.state = {
            articles:[],
            loading: false,
            page:1
        }
    }
   async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=1&PageSize=20"
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults});
      console.log(parsedData);

       }

       handlePrevClick= async()=>{
        if(this.state.page<=1){

        }else{
       
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page-1}&PageSize=20`;
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles});
        this.setState({
            page:this.state.page-1
        });
        }
       

       }
       handleNextClick= async()=>{
        if(this.state.page+1> Math.ceil(this.state.totalResults/20)){

        }else{
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page+1}&PageSize=20`;
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({articles:parsedData.articles});
            this.setState({
                page:this.state.page+1
            });
        }

       }

    render() {
        return (
          <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row"> 
               { this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/"} newsUrl={element.url}/>
                </div>
                })}
                   
                
                </div> 

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>


                </div>
            </div>
        )
    }
}

export default News
