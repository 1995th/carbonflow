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
      carbon_credits: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          quantity: number
          location: string
          project_type: string
          vintage: number
          verification_standard: string
          image_url: string
          status: 'available' | 'retired'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['carbon_credits']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['carbon_credits']['Insert']>
      }
      user_portfolios: {
        Row: {
          id: string
          user_id: string
          credit_id: string
          quantity: number
          purchase_price: number
          status: 'active' | 'retired'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_portfolios']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_portfolios']['Insert']>
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          credit_id: string
          type: 'purchase' | 'retirement'
          quantity: number
          price_per_credit: number
          total_amount: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>
      }
    }
  }
}