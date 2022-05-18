import {MongoClient, ObjectID} from 'mongodb';
import {connect} from 'mongoose';
import {AthleteInterface, Athlete} from './models/athlete';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'dsi-assessment';

export class AthleteManagement {
  constructor() {}

  /**
   * Crea un atleta en la base de datos de MongoDB
   * @param athlete Esquema de interfaz de atleta
   * @returns Promesa que verifica el cumplimiento de la creación
   */
  public createAthlete(athlete: AthleteInterface): Promise<AthleteInterface> {
    return new Promise<AthleteInterface>((resolve, reject) => {
      connect('mongodb://127.0.0.1:27017/dsi-assessment', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }).then(() => {
        return new Athlete(athlete).save();
      }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Encuentra un atleta en la base de datos de MongoDB dado un identificador
   * @param id Identificador a utilizar en la búsqueda
   * @returns Promesa que verifica el cumplimiento de la búsqueda
   */
  public findOneAthlete(id: string): Promise<AthleteInterface> {
    return new Promise<AthleteInterface>((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').findOne({
          _id: new ObjectID(id),
        });
      }).then((result) => {
        if (result) resolve(result);
        else reject(new Error('There is no athlete with that id'));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public findAthlete(nif: string): Promise<AthleteInterface> {
    return new Promise<AthleteInterface>((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').find({
          id: nif,
        }).toArray();
      }).then((result) => {
        if (result.length != 0) resolve(result[0]);
        else reject(new Error('There is no athlete with that nif'));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public updateOneAthlete(id: string, athlete: AthleteInterface): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').updateOne({
          _id: new ObjectID(id),
        }, {
          $set: {
            name: athlete.name,
            lastname: athlete.lastname,
            id: athlete.id,
            age: athlete.age,
            sport: athlete.sport,
            expert: athlete.expert,
            bestRecord: athlete.bestRecord,
          },
        });
      }).then((result) => {
        resolve(result.modifiedCount);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public updateAthlete(nif_: string, athlete: AthleteInterface): Promise<Number> {
    return new Promise<number>((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').updateMany({
          id: nif_,
        }, {
          $set: {
            name: athlete.name,
            lastname: athlete.lastname,
            id: athlete.id,
            age: athlete.age,
            sport: athlete.sport,
            expert: athlete.expert,
            bestRecord: athlete.bestRecord,
          },
        });
      }).then((result) => {
        resolve(result.modifiedCount);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public deleteAthlete(nif: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').deleteOne({
          id: nif,
        });
      }).then((result) => {
        if (result.deletedCount) resolve(result.deletedCount);
        else reject(new Error('Athlete not found'));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}