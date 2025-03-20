import asyncHandler from 'express-async-handler'
import { ResponseHandler } from '../services/responseHandler.js';
import Approval from '../models/approval.model.js';
import sequelize from '../config/sqlClient.js';
import { insertCommonDetails } from '../services/insertCommonUserDetails.js';


// This function creates the approval instnaces in mongodb
export const createApproval = asyncHandler(async (req, res) => {
    const { entityType, entitySubType, details, documents } = req.body
    const entityId = req.user?.id

    // This is the check-in point for the approval process
    // If the value doesn't come properly then return with error because we can't procssed further
    if (!entityType) return ResponseHandler.error(res, null, "Entity Type is missing", 400)
    if (!entitySubType) return ResponseHandler.error(res, null, "Entity SubType is missing", 400)
    if (!details) return ResponseHandler.error(res, null, "Details is missing", 400)
    if (!documents) return ResponseHandler.error(res, null, "Documents is missing", 400)

    // before pushing it to apprpval model
    // we need to check if the entity already has an approval instance
    const existingApproval = await Approval.findOne({ entityId, entityType })
    if (existingApproval) return ResponseHandler.error(res, null, "Entity already has an approval instance", 400)

    // creating the approval object to push into the Approval collection (mongoDb)
    const approval = {
        entityType,
        entityId,
        entitySubType,
        details,
        documents
    }
    // This is the approval object that will be pushed into the Approval collection (mongoDb)
    console.log("Approval object into backend", approval);

    // generate the approval instance in the Approval collection
    await Approval.create(approval)

    // If the approval is created successfully then return with success message
    return ResponseHandler.success(res, null, "Seller approval pending!!", 200)
})

// This is the function to get the approval details from the database
export const getAllApprovalDetails = asyncHandler(async (req, res) => {
    const { entityType } = req.body
    // make a query to get all the approval data of entity type

    const approvalData = await Approval.find({ entityType })

    if (!approvalData) return ResponseHandler.error(res, null, "Something went wrong while fetching approval data", 500)

    return ResponseHandler.success(res, approvalData, "Successfully fetched approval data", 200)

})

// export const processApproval = asyncHandler(async (req, res) => {
//     const { approvalId, comments, status } = req.body;

//     // Checking that the required data is present
//     if (!approvalId) return ResponseHandler.error(res, null, "Approval ID is missing", 400);
//     if (!comments) return ResponseHandler.error(res, null, "Comment missing", 400);
//     if (!status) return ResponseHandler.error(res, null, "Status is missing", 400);

//     // Fetch existing approval details
//     const existingApproval = await Approval.findById(approvalId);
//     if (!existingApproval) return ResponseHandler.error(res, null, "Approval not found", 404);

//     // Extract necessary details from the existing approval
//     const { entityType, entityId } = existingApproval;

//     if (status === "Approved") {

//         // Update approval status and comments
//         existingApproval.status = "Approved";
//         existingApproval.comments = comments;

//         // we have to start the transaction
//         const transaction = await sequelize.transaction()
//         if (entityType === 'User') {
//             try {

//                 // This is details related to the seller
//                 const { business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity } = existingApproval.details.basic_details;
//                 const { address: street_address, city, state, country, postalCode } = existingApproval.details.address; // Corrected variable names
//                 const { account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id } = existingApproval.details.bank;
//                 const documents = existingApproval.documents; // Array of documents

//                 // Create the seller entry
//                 const [sellerID] = await sequelize.query(
//                     `INSERT INTO sellers (user_id, business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity)
//                      VALUES (:entityId, :business_name, :owner_name, :business_email, :business_mobile, :gstin, :delivery_capacity)`,
//                     {
//                         replacements: { entityId, business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully inserted seller:", sellerID);

//                 // Fetch SELLER role ID
//                 const [sellerRole] = await sequelize.query(
//                     `SELECT id FROM roles WHERE name = 'SELLER'`,
//                     { type: sequelize.QueryTypes.SELECT, transaction }
//                 );
//                 console.log("Seller role details", sellerRole);
//                 const sellerRoleId = sellerRole.id;

//                 // Assign seller role to user
//                 await sequelize.query(
//                     `INSERT INTO user_roles (userId, roleId,entityId,entityType,status,createdAt,updatedAt) VALUES (:entityId, :sellerRoleId,:sellerID,"SELLER","approved",now(),now())`,
//                     {
//                         replacements: { entityId, sellerRoleId, sellerID },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully assigned seller role");

//                 // Create the address entry
//                 const [addressId] = await sequelize.query(
//                     `INSERT INTO addresses (entity_type, entity_id, address_type, address, city, state, country, postal_code)
//                      VALUES ("SELLER", :sellerID, "business", :street_address, :city, :state, :country, :postalCode)`,
//                     {
//                         replacements: { sellerID, street_address, city, state, country, postalCode },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully inserted address:", addressId);

//                 // Map address to seller in entity relations
//                 await sequelize.query(
//                     `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
//                      VALUES ("SELLER", :sellerID, "ADDRESS", :addressId)`,
//                     {
//                         replacements: { sellerID, addressId },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully mapped address to seller");

//                 // Insert bank details
//                 const [bankId] = await sequelize.query(
//                     `INSERT INTO banks (entity_type, entity_id, account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id)
//                      VALUES ("SELLER", :sellerID, :account_holder_name, :bank_name, :account_number, :ifsc_code, :account_type, :upi_id)`,
//                     {
//                         replacements: { sellerID, account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully inserted bank details:", bankId);

//                 // Map bank details to seller in entity relations
//                 await sequelize.query(
//                     `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
//                      VALUES ("SELLER", :sellerID, "BANK", :bankId)`,
//                     {
//                         replacements: { sellerID, bankId },
//                         type: sequelize.QueryTypes.INSERT,
//                         transaction
//                     }
//                 );
//                 console.log("Successfully mapped bank details to seller");

//                 // Insert multiple documents (loop through the array)
//                 for (const doc of documents) {
//                     const { documentType, publicId, fileType } = doc;

//                     const [documentId] = await sequelize.query(
//                         `INSERT INTO documents (entity_type, entity_id, document_type, public_id, file_type)
//                          VALUES ("SELLER", :sellerID, :documentType, :publicId,:fileType)`,
//                         {
//                             replacements: { sellerID, documentType, publicId, fileType },
//                             type: sequelize.QueryTypes.INSERT,
//                             transaction
//                         }
//                     );
//                     console.log("Successfully inserted document of type", documentId);

//                     // Map document details to seller in entity relations
//                     await sequelize.query(
//                         `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
//                          VALUES ("SELLER", :sellerID, "DOCUMENT", :documentId)`,
//                         {
//                             replacements: { sellerID, documentId },
//                             type: sequelize.QueryTypes.INSERT,
//                             transaction
//                         }
//                     );
//                     console.log(`Successfully mapped document to seller`);
//                 }
//                 // This ensure all transaction happen properly
//                 await transaction.commit();
//                 // here we are saving the updated mongodb collection
//                 existingApproval.save();
//                 return ResponseHandler.success(res, null, "Successfully approved", 200)
//             } catch (error) {
//                 // Rollback the transaction if there is an error
//                 await transaction.rollback();
//                 console.error("Transction failed:", error)
//                 return ResponseHandler.error(res, null, error.message || "Failed to approve", 500)
//             }
//         }
//     }
// })

// This will delete the seller as well as the associated data connected with the seller
// like the bank account ,address & documents etc.

export const processApproval = asyncHandler(async (req, res) => {
    const { approvalId, comments, status } = req.body;

    if (!approvalId) return ResponseHandler.error(res, null, "Approval ID is missing", 400);
    if (!comments) return ResponseHandler.error(res, null, "Comment missing", 400);
    if (!status) return ResponseHandler.error(res, null, "Status is missing", 400);

    const existingApproval = await Approval.findById(approvalId);
    if (!existingApproval) return ResponseHandler.error(res, null, "Approval not found", 404);

    const { entityType, entityId, entitySubType } = existingApproval;

    if (status === "Approved") {
        const transaction = await sequelize.transaction();

        try {
            let createdEntityId;

            if (entityType === 'User') {
                // User-specific details
                const { details, documents } = existingApproval;

                if (entitySubType === 'SELLER') {
                    const { business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity } = details.basic_details;

                    // Insert Seller
                    const [sellerID] = await sequelize.query(
                        `INSERT INTO sellers (user_id, business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity)
                         VALUES (:entityId, :business_name, :owner_name, :business_email, :business_mobile, :gstin, :delivery_capacity)`,
                        { replacements: { entityId, business_name, owner_name, business_email, business_mobile, gstin, delivery_capacity }, type: sequelize.QueryTypes.INSERT, transaction }
                    );

                    createdEntityId = sellerID;
                } else if (entitySubType === 'LOGISTIC') {
                    const { logistics_company, vehicle_capacity, transport_license } = details.logistics_details;

                    // Insert Logistic Partner
                    const [logisticID] = await sequelize.query(
                        `INSERT INTO logistics (user_id, company_name, vehicle_capacity, transport_license)
                         VALUES (:entityId, :logistics_company, :vehicle_capacity, :transport_license)`,
                        { replacements: { entityId, logistics_company, vehicle_capacity, transport_license }, type: sequelize.QueryTypes.INSERT, transaction }
                    );

                    createdEntityId = logisticID;
                }

                // Assign Role to User
                const [role] = await sequelize.query(
                    `SELECT id FROM roles WHERE name = :roleType`,
                    { replacements: { roleType: entitySubType }, type: sequelize.QueryTypes.SELECT, transaction }
                );

                await sequelize.query(
                    `INSERT INTO user_roles (userId, roleId, entityId, entityType, status, createdAt, updatedAt)
                     VALUES (:entityId, :roleId, :createdEntityId, :entitySubType, "approved", now(), now())`,
                    { replacements: { entityId, roleId: role.id, createdEntityId, entitySubType }, type: sequelize.QueryTypes.INSERT, transaction }
                );

                // Insert common details (Address, Bank, Documents)
                await insertCommonDetails({ transaction, createdEntityId, details, documents });

            } else if (entityType === 'Product') {
                // Handle product approval
                await sequelize.query(
                    `UPDATE products SET status = "Approved" WHERE id = :entityId`,
                    { replacements: { entityId }, type: sequelize.QueryTypes.UPDATE, transaction }
                );
            }

            await transaction.commit();

            // now every details has inserted successfully
            // it's time to update the approval status
            existingApproval.status = "Approved";
            existingApproval.comments = comments;
            existingApproval.actionBy = "Woocommerce Super Admin"; // This is static right now I will make this dynamic later
            existingApproval.save();
            return ResponseHandler.success(res, null, "Successfully approved", 200);
        } catch (error) {
            await transaction.rollback();
            console.error("Transaction failed:", error);
            return ResponseHandler.error(res, null, error.message || "Failed to approve", 500);
        }
    }
    else if(status === "Re-apply") {
        // Re-apply logic here
        existingApproval.status = "Re-apply";
        existingApproval.comments = comments;
        existingApproval.actionBy = "Woocommerce Super Admin"; // This is static right now I will make this dynamic later
        existingApproval.reapplyCount += 1;
        existingApproval.reapplyAfter = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
});


const deleteSeller = async (sellerId) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        // Delete from entity_relations (Important step!)
        await sequelize.query(
            "DELETE FROM entity_relations WHERE entity_id = :sellerId AND entity_type = 'seller'",
            { replacements: { sellerId }, transaction }
        );

        // Delete related addresses
        await sequelize.query(
            "DELETE FROM addresses WHERE entity_id = :sellerId AND entity_type = 'seller'",
            { replacements: { sellerId }, transaction }
        );

        // Delete related banks
        await sequelize.query(
            "DELETE FROM banks WHERE entity_id = :sellerId AND entity_type = 'seller'",
            { replacements: { sellerId }, transaction }
        );

        // Delete related documents
        await sequelize.query(
            "DELETE FROM documents WHERE entity_id = :sellerId AND entity_type = 'seller'",
            { replacements: { sellerId }, transaction }
        );

        // Finally, delete the seller
        await sequelize.query(
            "DELETE FROM sellers WHERE id = :sellerId",
            { replacements: { sellerId }, transaction }
        );

        // Commit transaction
        await transaction.commit();
        console.log(`Seller ${sellerId} and all related data deleted successfully.`);
        return ResponseHandler.success(res,)
    } catch (error) {
        await transaction.rollback();
        console.error("Error deleting seller:", error);
    }
};