import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allDrivers } from '../../redux/actions';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav';
import Paginator from '../Paginator/Paginator';