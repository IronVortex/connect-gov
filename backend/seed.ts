import { connect, Connection } from 'mongoose';
import { Department } from './src/schemas/department.schema';
import { Service } from './src/schemas/service.schema';
import * as dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/connect-platform';
    await connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Department.deleteMany({});
    await Service.deleteMany({});

    // Create departments
    const departments = await Department.create([
      {
        name: 'Department of Motor Vehicles',
        description: 'Driver licenses, vehicle registration, and related services',
        isActive: true,
      },
      {
        name: 'State Department',
        description: 'Passport, visa, and international travel documents',
        isActive: true,
      },
      {
        name: 'Revenue Department',
        description: 'Tax filing, income verification, and financial services',
        isActive: true,
      },
      {
        name: 'Health Services',
        description: 'Health certificates, immunization records, and medical documentation',
        isActive: true,
      },
      {
        name: 'Education Department',
        description: 'School enrollment, transcripts, and educational verification',
        isActive: true,
      },
    ]);

    console.log(`✓ Created ${departments.length} departments`);

    // Create services
    const services = await Service.create([
      {
        name: 'Driver License Renewal',
        description: 'Renew your existing driver license',
        departmentId: departments[0]._id,
        requiredDocuments: ['National ID', 'Proof of Residence', 'Medical Certificate'],
        isActive: true,
      },
      {
        name: 'Vehicle Registration',
        description: 'Register a new vehicle or renew registration',
        departmentId: departments[0]._id,
        requiredDocuments: ['Proof of Ownership', 'Insurance Certificate', 'ID Proof'],
        isActive: true,
      },
      {
        name: 'Passport Application',
        description: 'Apply for a new passport or renew existing',
        departmentId: departments[1]._id,
        requiredDocuments: ['Birth Certificate', 'National ID', 'Photo', 'Proof of Residence'],
        isActive: true,
      },
      {
        name: 'Visa Application',
        description: 'Apply for international visa',
        departmentId: departments[1]._id,
        requiredDocuments: ['Passport', 'Employment Letter', 'Bank Statements'],
        isActive: true,
      },
      {
        name: 'Tax Return Filing',
        description: 'File your annual tax returns',
        departmentId: departments[2]._id,
        requiredDocuments: ['Income Statement', 'Tax Forms', 'Supporting Documents'],
        isActive: true,
      },
      {
        name: 'Income Verification',
        description: 'Get an income verification letter',
        departmentId: departments[2]._id,
        requiredDocuments: ['Employment Letter', 'Recent Pay Stub', 'Tax Returns'],
        isActive: true,
      },
      {
        name: 'Vaccination Certificate',
        description: 'Get official vaccination documentation',
        departmentId: departments[3]._id,
        requiredDocuments: ['Medical Records', 'ID Proof'],
        isActive: true,
      },
      {
        name: 'School Enrollment',
        description: 'Enroll a student in a school',
        departmentId: departments[4]._id,
        requiredDocuments: ['Birth Certificate', 'Medical Records', 'Previous School Records'],
        isActive: true,
      },
    ]);

    console.log(`✓ Created ${services.length} services`);
    console.log('\nSeed data loaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
