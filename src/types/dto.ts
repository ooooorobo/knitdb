export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string
          creator_id: string
          height: number
          id: number
          url: string
          width: number
        }
        Insert: {
          created_at?: string
          creator_id: string
          height: number
          id?: number
          url: string
          width: number
        }
        Update: {
          created_at?: string
          creator_id?: string
          height?: number
          id?: number
          url?: string
          width?: number
        }
        Relationships: []
      }
      needle_images: {
        Row: {
          created_at: string
          creator_id: string
          id: number
          image_id: number
          needle_id: number
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: number
          image_id: number
          needle_id: number
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: number
          image_id?: number
          needle_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "needle_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "needle_images_needle_id_fkey"
            columns: ["needle_id"]
            isOneToOne: false
            referencedRelation: "needles"
            referencedColumns: ["id"]
          },
        ]
      }
      needles: {
        Row: {
          created_at: string
          creator_id: string | null
          id: number
          memo: string | null
          name: string
          price_amount: number | null
          price_currency: string | null
          type: string
          updated_at: string
          url: string | null
          width: number
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: number
          memo?: string | null
          name: string
          price_amount?: number | null
          price_currency?: string | null
          type: string
          updated_at?: string
          url?: string | null
          width: number
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: number
          memo?: string | null
          name?: string
          price_amount?: number | null
          price_currency?: string | null
          type?: string
          updated_at?: string
          url?: string | null
          width?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      yarn_images: {
        Row: {
          created_at: string
          creator_id: string | null
          id: number
          image_id: number | null
          yarn_id: number | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: number
          image_id?: number | null
          yarn_id?: number | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: number
          image_id?: number | null
          yarn_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yarn_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yarn_images_yarn_id_fkey"
            columns: ["yarn_id"]
            isOneToOne: false
            referencedRelation: "yarns"
            referencedColumns: ["id"]
          },
        ]
      }
      yarns: {
        Row: {
          color: string | null
          composition: string | null
          created_at: string
          creator_id: string
          id: number
          memo: string | null
          name: string
          needle_info: string | null
          price_amount: number | null
          price_currency: string | null
          thickness: number | null
          updated_at: string | null
          url: string | null
          weight: number
        }
        Insert: {
          color?: string | null
          composition?: string | null
          created_at?: string
          creator_id?: string
          id?: number
          memo?: string | null
          name: string
          needle_info?: string | null
          price_amount?: number | null
          price_currency?: string | null
          thickness?: number | null
          updated_at?: string | null
          url?: string | null
          weight: number
        }
        Update: {
          color?: string | null
          composition?: string | null
          created_at?: string
          creator_id?: string
          id?: number
          memo?: string | null
          name?: string
          needle_info?: string | null
          price_amount?: number | null
          price_currency?: string | null
          thickness?: number | null
          updated_at?: string | null
          url?: string | null
          weight?: number
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
