export default fromNodeMiddleware((req, res, next) => {
    console.log("Hello middleware");
    next();
});
