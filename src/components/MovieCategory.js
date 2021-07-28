import React, {useRef, useCallback} from 'react';
import '../assets/styling/movie-category.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MovieCategory({setPageNumber, movieData,hasMore, isLoading,pageNumber}) {
    const categories = ["movie", "series"]

    const observer = useRef();
    const lastBookElementRef = useCallback(node=>{
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node);
        // eslint-disable-next-line
    }, [isLoading, hasMore]);
    const movieCategory = movieData.filter( (movie)=>{
        return movie.Type === "movie";
    })
    const seriesCategory = movieData.filter( (movie)=>{
        return movie.Type === "series";
    })
    console.log(categories,movieCategory,seriesCategory)
    return (
            <div className="movies">
               {
                   categories.map((category)=> 
                    <div key={category}>
                        <p className="movie-category">{category}</p>
                        <PerfectScrollbar>
                            <div className="movie-collections">
                                <div className="movie-collection">
                                        {
                                        category === "movie" && (
                                            movieCategory.map((eachMovie, index)=>
                                            {
                                                if (movieCategory.length === index+1){
                                                    return( 
                                                        <div key={eachMovie.Title} ref={lastBookElementRef} className="single-movie">
                                                                <div className="single-movie-inner">
                                                                    <p className="movie-name">{eachMovie.Title}</p>
                                                                </div>    
                                                            </div>
                                                    )
                                                } else{
                                                return(
                                                        <div key={eachMovie.Title} className="single-movie">
                                                            <div className="single-movie-inner">
                                                                <p className="movie-name">{eachMovie.Title}</p>
                                                            </div>    
                                                        </div>
                                                )
                                                }
                                            }
                                            )
                                        )
                                        }
                                        {
                                            category === "series" && (
                                            seriesCategory.map((eachMovie, index)=>
                                            {
                                                if (seriesCategory.length === index+1){
                                                    return( 
                                                        <div key={eachMovie.Title} ref={lastBookElementRef} className="single-movie">
                                                                <div className="single-movie-inner">
                                                                    <p className="movie-name">{eachMovie.Title}</p>
                                                                </div>    
                                                            </div>
                                                    )
                                                } else{
                                                return(
                                                        <div key={eachMovie.Title} className="single-movie">
                                                            <div className="single-movie-inner">
                                                                <p className="movie-name">{eachMovie.Title}</p>
                                                            </div>    
                                                        </div>
                                                )
                                                }
                                            }
                                            )
                                        )
                                        }
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                   )
               }
            </div>
    )
}
