@@ .. @@
+import { supabaseAdmin } from '../_utils/supabase.js';
+import { signTokens } from '../_utils/jwt.js';
+import bcrypt from 'bcryptjs';
+
 // CORS headers for AWS Amplify
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
@@ .. @@
   try {
+    const { email, password } = req.body;
+
+    // Validation
+    if (!email || !password) {
+      return res.status(400).json({
+        success: false,
+        error: 'Email and password are required'
+      });
+    }
+
+    // Find admin user
+    const { data: admin, error: adminError } = await supabaseAdmin
+      .from('admins')
+      .select('*')
+      .eq('email', email)
+      .single();
+
+    if (adminError || !admin) {
+      return res.status(401).json({
+        success: false,
+        error: 'Invalid credentials'
+      });
+    }
+
+    // Verify password
+    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
+    if (!isValidPassword) {
+      return res.status(401).json({
+        success: false,
+        error: 'Invalid credentials'
+      });
+    }
+
+    // Generate tokens
+    const tokens = signTokens({
+      userId: admin.id,
+      email: admin.email,
+      role: 'ADMIN'
+    });
+
     return res.status(200).json({
       success: true,
-      message: 'Logout successful'
+      message: 'Login successful',
+      data: {
+        user: {
+          id: admin.id,
+          email: admin.email,
+          role: 'ADMIN'
+        },
+        tokens
+      }
     });