class Ad {
    constructor(object) {
        this.id = object.id;
        this.title = object.title;
        this.price = object.price;
        this.date = object.date;
        this.description = object.description;
        this.propertyType = object.propertyType;
        this.propertyStatus = object.propertyStatus;
        this.publicationStatus = object.publicationStatus;
        this.images = object.images;
        this.comments = object.comments?.map(comment => new Comment(comment));
    }
    formatedDate(params) {
        return new Date(this.date + (params.offset * 60 * 60 * 1000)).toISOString().split('T')[0]
    }
    commentsLength() {
        return this.comments.length;
    }
}
module.exports.Ad = Ad;

class Comment {
    constructor(object) {
        this.question = object.question;
        this.user = object.user;
        this.answers = object.answers;
        this.answers = object.answers?.map(answers => new Answer(answers));
    }
    answersLength() {
        return this.answers.length;
    }
}
module.exports.Comment = Comment;

class Answer {
    constructor(object) {
        this.content = object.content;
        this.agent = object.agent;
    }
}
module.exports.Answer = Answer;