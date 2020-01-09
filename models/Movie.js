"use strict";
class Movie {
    constructor(id, story, buy, video1, thumb, video2, poster, advice, title, cast, director, genre, duration, release, availability) {
        this.id = id;
        this.story = story;
        this.buy = buy;
        this.video1 = video1;
        this.thumb = thumb;
        this.video2 = video2;
        this.poster = poster;
        this.advice = advice;
        this.title = title;
        this.cast = cast;
        this.director = director;
        this.genre = genre;
        this.duration = duration;
        this.release = release;
        this.availability = availability;
    }
    //add the get methods here
    getId() {
        return this.id;
    }
    getStory() {
        return this.story;
    }
    getBuy() {
        return this.buy;
    }
    getVideo1() {
        return this.video1;
    }
    getThumb() {
        return this.thumb;
    }
    getVideo2() {
        return this.video2;
    }
    getPoster() {
        return this.poster;
    }
    getAdvice() {
        return this.advice;
    }
    getTitle() {
        return this.title;
    }
    getCast() {
        return this.cast;
    }
    getDirector() {
        return this.director;
    }
    getGenre() {
        return this.genre;
    }
    getDuration() {
        return this.duration;
    }
    getRelease() {
        return this.release;
    }
    getAvailability() {
        return this.availability;
    }
}
module.exports = Movie;