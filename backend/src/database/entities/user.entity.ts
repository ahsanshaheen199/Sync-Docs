import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn({ type: 'character', length: 26 })
	id: string;

	@Column({ name: 'first_name', nullable: true })
	firstName: string;

	@Column({ name: 'last_name', nullable: true })
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean;

	@Column({ name: 'verification_token', nullable: true })
	verificationToken: string;

	@Column({ name: 'verification_token_expires_at', nullable: true })
	verificationTokenExpiresAt: Date;

	@Column({ nullable: true, name: 'password_reset_token' })
	passwordResetToken: string;

	@Column({ nullable: true, name: 'password_reset_token_expires_at' })
	passwordResetTokenExpiresAt: Date;

	@Column({ name: 'avatar_url', nullable: true })
	avatarUrl: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@BeforeInsert()
	async beforeInsert() {
		this.id = ulid();
		this.password = await bcrypt.hash(this.password, 10);
	}
}
