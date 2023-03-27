import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addProducer, editProducer } from '../global/producerSlice';
import { useAppDispatch } from '../global/store';
import { IProducerProps } from '../models/producer';
import { v4 as uuidv4 } from 'uuid';

const useProducer = () => {
  const dispatch = useAppDispatch();
  const [formAction, setFormAction] = useState<'saveEdit' | 'saveNew'>(
    'saveNew'
  );
  const { pathname } = useLocation();

  useEffect(() => {
    setFormAction(
      pathname.includes('produtores/editar') ? 'saveEdit' : 'saveNew'
    );
  }, [pathname]);

  const producerFormAction = {
    saveNew: (producer: IProducerProps) =>
      dispatch(addProducer({ ...producer, id: uuidv4() })),
    saveEdit: (producer: IProducerProps) => dispatch(editProducer(producer)),
  };

  return { producerFormAction: producerFormAction[formAction] };
};

export default useProducer;
