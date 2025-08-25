export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          country: string
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          country?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          gtin: string
          description: string | null
          manufacturer_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          gtin: string
          description?: string | null
          manufacturer_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          gtin?: string
          description?: string | null
          manufacturer_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      batches: {
        Row: {
          id: string
          batch_number: string
          expiry_date: string
          product_id: string
          status: 'PRODUCED' | 'IN_TRANSIT' | 'AT_WAREHOUSE' | 'DELIVERED' | 'RECALLED'
          current_location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          batch_number: string
          expiry_date: string
          product_id: string
          status?: 'PRODUCED' | 'IN_TRANSIT' | 'AT_WAREHOUSE' | 'DELIVERED' | 'RECALLED'
          current_location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          batch_number?: string
          expiry_date?: string
          product_id?: string
          status?: 'PRODUCED' | 'IN_TRANSIT' | 'AT_WAREHOUSE' | 'DELIVERED' | 'RECALLED'
          current_location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shipments: {
        Row: {
          id: string
          reference: string
          batch_id: string
          origin: string
          destination: string
          status: 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'CANCELLED'
          checkpoints: Json[]
          company_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference: string
          batch_id: string
          origin: string
          destination: string
          status?: 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'CANCELLED'
          checkpoints?: Json[]
          company_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          batch_id?: string
          origin?: string
          destination?: string
          status?: 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'CANCELLED'
          checkpoints?: Json[]
          company_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      sensors: {
        Row: {
          id: string
          serial: string
          company_id: string
          product_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          serial: string
          company_id: string
          product_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          serial?: string
          company_id?: string
          product_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sensor_readings: {
        Row: {
          id: string
          sensor_id: string
          temperature: number
          humidity: number | null
          latitude: number | null
          longitude: number | null
          created_at: string
        }
        Insert: {
          id?: string
          sensor_id: string
          temperature: number
          humidity?: number | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          sensor_id?: string
          temperature?: number
          humidity?: number | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          type: 'TEMP_BREACH' | 'HUMIDITY_BREACH' | 'COUNTERFEIT_SUSPECT' | 'DELIVERY_DELAY'
          message: string
          company_id: string
          shipment_id: string | null
          sensor_id: string | null
          resolved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: 'TEMP_BREACH' | 'HUMIDITY_BREACH' | 'COUNTERFEIT_SUSPECT' | 'DELIVERY_DELAY'
          message: string
          company_id: string
          shipment_id?: string | null
          sensor_id?: string | null
          resolved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'TEMP_BREACH' | 'HUMIDITY_BREACH' | 'COUNTERFEIT_SUSPECT' | 'DELIVERY_DELAY'
          message?: string
          company_id?: string
          shipment_id?: string | null
          sensor_id?: string | null
          resolved?: boolean
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          product_id: string
          action: string
          actor_id: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          action: string
          actor_id: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          action?: string
          actor_id?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      compliance_reports: {
        Row: {
          id: string
          company_id: string
          type: string
          file_path: string
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          type: string
          file_path: string
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          type?: string
          file_path?: string
          created_at?: string
        }
      }
      sensor_shipments: {
        Row: {
          sensor_id: string
          shipment_id: string
        }
        Insert: {
          sensor_id: string
          shipment_id: string
        }
        Update: {
          sensor_id?: string
          shipment_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}