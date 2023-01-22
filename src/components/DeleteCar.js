import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Navigation,
  Pagination, A11y,
} from 'swiper';
import { allCars, getAllCars, deleteCar } from '../redux/cars/carSlice';
import { currentUserRole } from '../redux/user/userSlice';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DeleteCar = () => {
  const cars = useSelector(allCars);
  const role = useSelector(currentUserRole);

  const dispatch = useDispatch();
  const swiperRef = useRef();

  useEffect(() => { dispatch(getAllCars()); }, [dispatch]);

  const handleDeletion = (carId) => dispatch(deleteCar(carId));

  return (
    <div className="App">
      <Navbar />
      <main className="main del-car-page">
        <h1 className="title">DELETE A CAR</h1>
        <p className="sub-title">Please select a Car to delete</p>

        { role !== 1 ? (
          <section className="caution-section">
            <FontAwesomeIcon icon={faTriangleExclamation} className="caution" />
            <h2>Only Admins Can Delete A Car!</h2>
          </section>
        ) : ''}

        <section className="cars-container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            // spaceBetween={20}
            // slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                spaceBetween: 15,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              900: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            { cars.map((car) => (
              <SwiperSlide key={car.id}>
                <div className="car">
                  <div className="car-img-wrap">
                    <img className="car-img" src={car.image} alt={car.name} />
                  </div>
                  <div className="car-details">
                    <h3 className="car-name">
                      {car.name.slice(0, 20)}
                      {car.name.length > 20 ? '...' : ''}
                    </h3>
                    <p className="car-model">{car.model}</p>
                    <hr />
                    <p className="car-desc">
                      {car.description.slice(0, 40)}
                      {car.description.length > 40 ? '...' : ''}
                    </p>
                  </div>
                  { role === 1 ? (
                    <button className="del-car" type="button" onClick={() => handleDeletion(car.id)}>Delete</button>
                  ) : ''}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" aria-label="previous" className="btn prev" onClick={() => swiperRef.current?.slidePrev()} />
          <button type="button" aria-label="previous" className="btn next" onClick={() => swiperRef.current?.slideNext()} />
        </section>

      </main>
    </div>
  );
};

export default DeleteCar;
