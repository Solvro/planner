import Group from '#models/group'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Group.createMany([
      {
        name: 'Mathematics 101',
        startTime: '09:15:00',
        endTime: '11:00:00',
        group: '1',
        lecturer: 'John Doe',
        week: 'TN',
        day: 'Monday',
        type: 'L',
        courseId: 'usos.mathematics.com',
      },
      {
        name: 'Physics 202',
        startTime: '11:15:00',
        endTime: '13:00:00',
        group: '7',
        lecturer: 'Billu The Goat',
        week: '-',
        day: 'Wednesday',
        type: 'W',
      },
      {
        name: 'Chemistry 303',
        startTime: '13:15:00',
        endTime: '15:00:00',
        group: '3',
        lecturer: 'Jane Smith',
        week: 'TN',
        day: 'Friday',
        type: 'L',
        courseId: 'usos.chemistry.com',
      },
      {
        name: 'Biology 404',
        startTime: '15:15:00',
        endTime: '17:00:00',
        group: '2',
        lecturer: 'Alice Johnson',
        week: '-',
        day: 'Tuesday',
        type: 'W',
        courseId: 'usos.biology.com',
      },
      {
        name: 'Computer Science 505',
        startTime: '17:15:00',
        endTime: '19:00:00',
        group: '5',
        lecturer: 'Bob Brown',
        week: 'TN',
        day: 'Thursday',
        type: 'L',
        courseId: 'usos.compsci.com',
      },
    ])
  }
}
