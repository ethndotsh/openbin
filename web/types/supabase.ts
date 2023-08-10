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
          draft: boolean | null
          expires_at: string | null
          file: string | null
          id: string
          language: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          draft?: boolean | null
          expires_at?: string | null
          file?: string | null
          id?: string
          language?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          draft?: boolean | null
          expires_at?: string | null
          file?: string | null
          id?: string
          language?: string | null
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
      check_paste_access: {
        Args: {
          bucket_id_param: string
          file_param: string
          user_id_param: string
        }
        Returns: boolean
      }
      get_uuid_from_filename: {
        Args: {
          filename: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
