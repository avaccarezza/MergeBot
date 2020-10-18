import React from 'react';
import mergeImages from 'merge-images';

const clientID = 'RjsPMJAfMUwT7iB5GcUaqzG8gTmq1ogfXYpaKZYkQmU';
const endpoint = 'https://api.unsplash.com/search/photos';

export default class App extends React.Component {
 
  constructor()
  {
    super();
    this.query='';
    this.trackQueryValue = this.trackQueryValue.bind(this);
    this.search = this.search.bind(this);

    this.state= 
    { 
      images:[],
      imagen: null, 
      imagen1: null,
      imagen2: null,
      imagen3: null,
     
    }
  } 
  
  search()
  {
    if(this.query!= null && this.query!=""){
     
      fetch(`${endpoint}?query=${this.query}&client_id=${clientID}&per_page=3&orientation=landscape`)
      .then(response=>{
           return response.json()
    }).then(jsonResponse=>{
          console.log(jsonResponse);
          return jsonResponse.results;
    }).then(results => this.marge(results))

    }     
  }
  

  marge(jsonImagenes) 
  {
     var arrayImagenes = jsonImagenes.map(images => {return  images.urls.small})  
     var img1 = arrayImagenes[0]
     var img2 = arrayImagenes[1]
     var img3 = arrayImagenes[2]
     this.setState({imagen1:img1})
     this.setState({imagen2:img2})
     this.setState({imagen3:img3})
     
     var b64 =  mergeImages( [
      { src: arrayImagenes[0], x: 0, y: 0  },
      { src: arrayImagenes[1], x: 25, y: 25, opacity:0.7 },
      { src: arrayImagenes[2], x: 50, y: 50, opacity:0.3 }
    ],{  crossOrigin :'Anonymous'})
      .then(b64 => {this.setState({imagen:b64})})
      
  }

  trackQueryValue(ev){
    this.query = ev.target.value;
  }

  render() {
      return(
<section class="webdesigntuts-workshop">
  
        <div class="buscador" >		    
            <input type="text" onChange={this.trackQueryValue}/>
            <button onClick={this.search}>Buscar</button>
        </div> 
    <div>  
        <div class="portfolio-item">
            <div class="image">
            <img class="imagenMerge" src={this.state.imagen} crossOrigin="anonymous"  />
            </div>
        </div>
      </div>
      <div class="full-screen-portfolio" id="portfolio">
          <div class="container-fluid">
              <div class="col-md-4 col-sm-6">
                  <div class="portfolio-item">
                      <div class="image">
                          <img src={this.state.imagen1}/>
                      </div>
                   </div>    
              </div>
          <div class="col-md-4 col-sm-6">
            <div class="portfolio-item">
                  <div class="image">
                      <img src={this.state.imagen2}/>
                  </div>
            </div>    
          </div>
          <div class="col-md-4 col-sm-6">
              <div class="portfolio-item">
                  <div class="image">
                      <img src={this.state.imagen3}/>
                  </div>
              </div>    
          </div>
      </div>
    </div>    
  </section>
   
    
      
      
      
      
      );
    
  } 
}