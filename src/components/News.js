import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=1&PageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults});
      console.log(parsedData);
      this.setState({
        loading:false
    });

       }

       handlePrevClick= async()=>{
        if(this.state.page<=1){

        }else{
       
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page-1}&PageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles});
        this.setState({
            page:this.state.page-1,
            loading:false
        });
        }
       

       }
       handleNextClick= async()=>{
        
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page+1}&PageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({articles:parsedData.articles});
            this.setState({
                page:this.state.page+1,
                loading:false
            });
        
           
        

       }

    render() {
        return (
          <div className="container my-3">
                <h1 className='text-center'>NewsApp - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row"> 
               {!this.state.loading && this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/"} newsUrl={element.url}/>
                </div>
                })}
                   
                
                </div> 

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>


                </div>
            </div>
        )
    }
}

export default News
