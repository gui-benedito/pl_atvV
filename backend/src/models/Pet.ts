import { Table, Column, Model, DataType, BelongsToMany, HasMany, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Cliente } from './Cliente'
import { Compra } from './Compra'

@Table({
    tableName: 'Pet',
    timestamps: false
})

export class Pet extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    pet_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    pet_nome!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    pet_tipo!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    pet_raca!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    pet_genero!: string

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cliente_id!: number

    @BelongsTo(() => Cliente)
    Cliente!: Cliente

    @HasMany(() => Compra)
    compras!: Compra[]
}