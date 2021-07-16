const Rating = ({ value, numRatings, color }) => {
    const getStar = (starNum) => {
        const star =
            value >= starNum
                ? 'fas fa-star'
                : value > starNum - 1
                ? 'fas fa-star-half-alt'
                : 'far fa-star';
        return <i style={{ color }} key={starNum} className={star} />;
    };

    return (
        <div className='rating'>
            {[1, 2, 3, 4, 5].map((val) => {
                return getStar(val);
            })}
            <span>
                {numRatings} rating{numRatings !== 1 && 's'}
            </span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825',
};

export default Rating;
