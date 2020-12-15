import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/picbox.css';
import API from '../../../api/helpers';

const markerIcon = <i className="material-icons">room</i>;
const heartIcon = <i className="material-icons">favorite</i>;
const heartIconFilled = (
    <i style={{ color: 'red' }} className="material-icons">
        favorite
    </i>
);

const HousePics = ({ pics, userId }) => {
    const [allPics, setLikedPics] = useState(pics);
    useEffect(() => {
        setLikedPics(pics);
    }, [pics]);

    const horizontalScroll = (imgs, picId) => {
        return imgs.map((img, idx) => {
            return (
                <div className="property-pic" key={idx}>
                    <Link to={`/property/${picId}`}>
                        <img src={img} alt={picId} />
                    </Link>
                </div>
            );
        });
    };

    const favoriteHouse = (id, userId, index) => {
        API.favoriteHome(userId, id)
            .then((res) => {
                const {
                    data: {
                        data: {
                            updateLikes: { likes },
                        },
                    },
                } = res;
                setLikedPics(
                    allPics.map((pic, idx) => {
                        if (idx === index) {
                            return { ...pic, likes: [...likes] };
                        }
                        return pic;
                    })
                );
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="house-pics">
                {allPics.map((pic, id) => {
                    const isLiked = pic && pic.likes.includes(userId);
                    return (
                        <div key={id} className="property-wrapper">
                            <div className="horizontal-scroll">
                                {horizontalScroll(pic.imgs, pic._id)}
                            </div>
                            <div className="property-info">
                                <p>
                                    <span
                                        onClick={() =>
                                            favoriteHouse(pic._id, userId, id)
                                        }
                                    >
                                        {isLiked ? heartIconFilled : heartIcon}
                                    </span>
                                    <span className="house-price">
                                        {markerIcon} ${pic.price}
                                    </span>
                                    <span className="house-address">
                                        {pic.address}, {pic.city} {pic.zipCode}
                                    </span>
                                </p>
                                <p>
                                    <span className="house-beds">
                                        {pic.bedRooms} Beds
                                    </span>
                                    <span className="house-baths">
                                        {pic.bathRooms} Baths
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HousePics;
