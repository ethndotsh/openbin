export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pastes: {
        Row: {
          author: string;
          created_at: string | null;
          description: string | null;
          draft: boolean | null;
          expires_at: string | null;
          file: string;
          id: string;
          language: string | null;
          remix_of: string | null;
          title: string | null;
        };
        Insert: {
          author: string;
          created_at?: string | null;
          description?: string | null;
          draft?: boolean | null;
          expires_at?: string | null;
          file: string;
          id?: string;
          language?: string | null;
          remix_of?: string | null;
          title?: string | null;
        };
        Update: {
          author?: string;
          created_at?: string | null;
          description?: string | null;
          draft?: boolean | null;
          expires_at?: string | null;
          file?: string;
          id?: string;
          language?: string | null;
          remix_of?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pastes_author_fkey";
            columns: ["author"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pastes_remix_of_fkey";
            columns: ["remix_of"];
            referencedRelation: "pastes";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_paste_access: {
        Args: {
          bucket_id_param: string;
          file_param: string;
          user_id_param: string;
        };
        Returns: boolean;
      };
      get_uuid_from_filename: {
        Args: {
          filename: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
