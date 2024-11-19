import { Table, Column, Model, DataType, BelongsToMany, HasMany, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'

@Table({
    tableName: 'Servico',
    timestamps: false
})

export default class Servico extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    servico_id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    servico_nome!: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    servico_preco!: number
}