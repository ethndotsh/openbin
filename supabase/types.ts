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
      pastes: {
        Row: {
          author: string | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          file: string | null
          id: string
          private: boolean | null
          syntax: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          file?: string | null
          id?: string
          private?: boolean | null
          syntax?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          file?: string | null
          id?: string
          private?: boolean | null
          syntax?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pastes_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
