import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl,newsUrl,author,date,countryCode,mediaName} = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title} <span class="badge text-bg-success">{mediaName}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toLocaleDateString(countryCode, {day:"numeric", weekday:"long", year:"numeric", month:"short"}) }</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
