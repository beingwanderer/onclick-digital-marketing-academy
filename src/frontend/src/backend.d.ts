import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    fullName: string;
    timestamp: Time;
    emailAddress: string;
    phoneNumber: string;
    purpose: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllLeads(): Promise<Array<Lead>>;
    submitLead(fullName: string, phoneNumber: string, emailAddress: string, purpose: string): Promise<void>;
}
