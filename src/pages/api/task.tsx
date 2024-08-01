import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/tasks';

type Task = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get<Task[]>(`${BASE_URL}/`);
        res.status(200).json(response.data);
      } catch (error: any) {
        res
          .status(error.response?.status || 500)
          .json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const response = await axios.post<Task>(`${BASE_URL}/`, body);
        res.status(201).json(response.data);
      } catch (error: any) {
        res
          .status(error.response?.status || 500)
          .json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
